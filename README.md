# Zag Science PWA

GitHub Pages build with PWA install support. Existing app CSS and JavaScript remain inline and in their original order. App images remain in assets/images. PWA icons are in assets/icons.


## v14
Adds authenticated Supabase PB cloud backup/sync while preserving local storage as the on-device copy.

## v15
- Fresh installs start with empty PBs; existing device PBs are preserved and signed-in cloud PBs can restore onto a clean install.
- Added bodyweight setting with kg/lb conversion and cloud profile update when signed in.
- Added a two-week bodyweight reminder (delivered when the PWA is active/open; fully closed timed delivery will use the later push backend).
- Removed duplicated “Zag Science” wording from notification titles.
- Restored the trophy figurine artwork to Create Group.
