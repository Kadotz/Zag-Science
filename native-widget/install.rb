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
bridge_ref = app_group_ref.new_file('ZagBridgeViewController.swift')
app.source_build_phase.add_file_reference(bridge_ref)
widget_group = project.main_group.find_subpath('ZagStrengthWidget', true)
widget_file = widget_group.new_file('ZagStrengthWidget/ZagStrengthWidget.swift')
widget = project.new_target(:app_extension, 'ZagStrengthWidget', :ios, '17.0')
widget.source_build_phase.add_file_reference(widget_file)
# Xcode's output path is taken from the product reference *path*, not its
# display name. Without this, Xcode archives the extension as `.appex`.
widget.product_reference.name = 'ZagStrengthWidget.appex'
widget.product_reference.path = 'ZagStrengthWidget.appex'
widget.product_reference.source_tree = 'BUILT_PRODUCTS_DIR'
widget.build_configurations.each do |cfg|
  cfg.build_settings.merge!({
    'PRODUCT_BUNDLE_IDENTIFIER' => 'com.zagscience.app.StrengthWidget',
    'PRODUCT_NAME' => 'ZagStrengthWidget',
    'EXECUTABLE_NAME' => '$(EXECUTABLE_PREFIX)$(PRODUCT_NAME)$(EXECUTABLE_SUFFIX)',
    'WRAPPER_NAME' => '$(PRODUCT_NAME).appex',
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
# App Intents metadata extraction requires a complete extension Info.plist.
# The previous NSExtension-only plist could compile but fail at
# AppIntentsSSUTraining with "Unable to parse Info.plist".
File.write(File.join(widget_dir,'Info.plist'), <<~PLIST)
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key><string>$(DEVELOPMENT_LANGUAGE)</string>
  <key>CFBundleDisplayName</key><string>Zag Science Strength</string>
  <key>CFBundleExecutable</key><string>$(EXECUTABLE_NAME)</string>
  <key>CFBundleIdentifier</key><string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
  <key>CFBundleInfoDictionaryVersion</key><string>6.0</string>
  <key>CFBundleName</key><string>$(PRODUCT_NAME)</string>
  <key>CFBundlePackageType</key><string>XPC!</string>
  <key>CFBundleShortVersionString</key><string>$(MARKETING_VERSION)</string>
  <key>CFBundleVersion</key><string>$(CURRENT_PROJECT_VERSION)</string>
  <key>NSExtension</key>
  <dict>
    <key>NSExtensionPointIdentifier</key><string>com.apple.widgetkit-extension</string>
  </dict>
</dict>
</plist>
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
# Update the view-controller element without introducing duplicate XML attributes.
# Capacitor's storyboard already declares customModule/customModuleProvider.
replaced = false
s = s.gsub(/<viewController\b[^>]*\bcustomClass="CAPBridgeViewController"[^>]*>/) do |tag|
  replaced = true
  tag = tag.sub('customClass="CAPBridgeViewController"', 'customClass="ZagBridgeViewController"')
  tag = tag.gsub(/\s+customModule="[^"]*"/, '')
  tag = tag.gsub(/\s+customModuleProvider="[^"]*"/, '')
  tag.sub(/\s*\/>\z|>\z/) do |ending|
    %( customModule="App" customModuleProvider="target"#{ending})
  end
end
abort 'Could not patch CAPBridgeViewController storyboard element' unless replaced
REXML::Document.new(s) # Validate storyboard XML before saving it.
File.write(storyboard,s)
project.save
puts 'Widget extension, shared entitlements, bridge and embed phase installed.'
