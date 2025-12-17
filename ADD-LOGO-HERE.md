# Add Your Logo

Please save your Sacramento State Cyber Security Club logo as:

```
public/logo.png
```

## Quick Instructions:

1. Right-click the logo image you shared in chat
2. Save it as `logo.png`
3. Place it in the `public/` folder

The website is already configured to display it in:
- ✅ Header navigation (top left, 48x48px)
- ✅ Homepage hero section (center, 192x192px)

Once you add the logo file, run:
```bash
npm run dev
```

And you'll see your awesome hornet logo throughout the site!

## Optional: Update Favicon

If you want to use the logo as the browser tab icon:
1. Create a smaller version (32x32px or 64x64px)
2. Save as `public/favicon.png`
3. Update `src/layouts/Layout.astro` line 17 to point to `/favicon.png`
