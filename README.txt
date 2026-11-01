ZAG SCIENCE ROOT REPLACEMENT FILES

IMPORTANT: Open your existing GitHub repository folder, then copy index.html and the assets folder DIRECTLY INTO THE REPOSITORY ROOT. Do NOT create another Zag-Science folder inside it.

Overwrite the existing index.html and matching assets.

The first Tips image is now tip-transparent-02.webp (verified transparent), not the checkerboard tip-transparent-01.webp. The old image may remain in assets but is not referenced by the tips sequence.

After committing, verify GitHub's root index.html has: const zagTipImages=['assets/images/tip-transparent-02.webp', ...

Build a NEW TestFlight version from that commit. An already installed TestFlight build will not change by itself.
