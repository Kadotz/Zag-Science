require 'xcodeproj'
require 'fileutils'
require 'rexml/document'
project_path = 'ios/App/App.xcodeproj'
project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == 'App' }
abort 'Missing Capacitor App target' unless app
app_group = 'group.com.zagscience.app'
base = 'ios/App'
widget_dir = File.join(base, 'ZagStrengthWidget')
FileUtils.mkdir_p(widget_dir)
FileUtils.cp('zag_widget_starter/ZagStrengthWidget/ZagStrengthWidget.swift', widget_dir)
FileUtils.cp('native-widget/ZagBridgeViewController.swift', File.join(base,'App/ZagBridgeViewController.swift'))
app_group_ref = project.main_group.find_subpath('App', true)
bridge_ref = app_group_ref.new_file('App/ZagBridgeViewController.swift')
app.source_build_phase.add_file_reference(bridge_ref)
widget_group = project.main_group.find_subpath('ZagStrengthWidget', true)
widget_file = widget_group.new_file('ZagStrengthWidget/ZagStrengthWidget.swift')
widget = project.new_target(:app_extension, 'ZagStrengthWidget', :ios, '17.0')
widget.source_build_phase.add_file_reference(widget_file)
widget.product_reference.name = 'ZagStrengthWidget.appex'
widget.build_configurations.each do |cfg|
  cfg.build_settings.merge!({
    'PRODUCT_BUNDLE_IDENTIFIER' => 'com.zagscience.app.StrengthWidget',
    'INFOPLIST_FILE' => 'ZagStrengthWidget/Info.plist',
    'GENERATE_INFOPLIST_FILE' => 'NO',
    'SWIFT_VERSION' => '5.0',
    'IPHONEOS_DEPLOYMENT_TARGET' => '17.0',
    'TARGETED_DEVICE_FAMILY' => '1,2',
    'CODE_SIGN_ENTITLEMENTS' => 'ZagStrengthWidget/ZagStrengthWidget.entitlements',
    'SKIP_INSTALL' => 'YES',
    # Keep extension's build product outside App.app/PlugIns. The embed phase
    # alone copies it into the app; otherwise archive can produce it twice.
    'CONFIGURATION_BUILD_DIR' => '$(BUILD_DIR)/ZagWidgetProducts/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME)',
    'APPLICATION_EXTENSION_API_ONLY' => 'YES',
    'LD_RUNPATH_SEARCH_PATHS' => '$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks',
    'SWIFT_EMIT_LOC_STRINGS' => 'YES'
  })
end
app.build_configurations.each do |cfg|
  cfg.build_settings['CODE_SIGN_ENTITLEMENTS'] = 'App/App.entitlements'
end
# Only one embed phase and one product reference may install the extension.
app.copy_files_build_phases.each do |phase|
  phase.files.each do |file|
    if file.file_ref == widget.product_reference || file.file_ref&.path.to_s.end_with?('ZagStrengthWidget.appex')
      phase.remove_build_file(file)
    end
  end
end
embed = app.copy_files_build_phases.find { |phase| phase.name == 'Embed App Extensions' } || app.new_copy_files_build_phase('Embed App Extensions')
embed.dst_subfolder_spec = '13'
build_file = embed.add_file_reference(widget.product_reference)
build_file.settings = {'ATTRIBUTES'=>['RemoveHeadersOnCopy']}
app.add_dependency(widget)
File.write(File.join(widget_dir,'Info.plist'), <<~PLIST)
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict><key>NSExtension</key><dict><key>NSExtensionPointIdentifier</key><string>com.apple.widgetkit-extension</string></dict></dict></plist>
PLIST
File.write(File.join(widget_dir,'ZagStrengthWidget.entitlements'), <<~PLIST)
<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict><key>com.apple.security.application-groups</key><array><string>#{app_group}</string></array></dict></plist>
PLIST
File.write(File.join(base,'App/App.entitlements'), <<~PLIST)
<?xml version="1.0" encoding="UTF-8"?><plist version="1.0"><dict><key>aps-environment</key><string>production</string><key>com.apple.security.application-groups</key><array><string>#{app_group}</string></array></dict></plist>
PLIST
storyboard = File.join(base,'App/Base.lproj/Main.storyboard')
abort "Missing storyboard: #{storyboard}" unless File.exist?(storyboard)
s = File.read(storyboard)
abort 'Cannot locate CAPBridgeViewController storyboard class' unless s.include?('CAPBridgeViewController')
s = s.gsub('customClass="CAPBridgeViewController"', 'customClass="ZagBridgeViewController" customModule="App" customModuleProvider="target"')
File.write(storyboard,s)
project.save
puts 'Widget extension, shared entitlements, bridge and embed phase installed.'
