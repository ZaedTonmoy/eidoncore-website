# Animation Kit — Setup & Usage

## 1. Install
```bash
npm install framer-motion
```

## 2. Files
Copy these into your Next.js project:
```
lib/animations.ts
components/AnimatedHeading.tsx
components/AnimatedText.tsx
components/StaggerReveal.tsx
components/AnimatedButton.tsx
```

## 3. Remove old animations
Delete/remove any existing `whileInView`, `AOS`, `ScrollTrigger`, or CSS
`@keyframes` used for section reveals — this kit replaces all of that.

## 4. Usage examples

### Headings (letter by letter)
```tsx
import AnimatedHeading from "@/components/AnimatedHeading";

<AnimatedHeading as="h1" text="We build modern websites" className="text-5xl font-bold" />
```

### Paragraph text (word by word)
```tsx
import AnimatedText from "@/components/AnimatedText";

<AnimatedText
  text="We help brands grow with fast, modern, AI-driven web experiences."
  className="text-lg text-neutral-600"
/>
```

### Long text (line by line instead of word by word)
```tsx
<AnimatedText mode="line" text={`First line of text\nSecond line of text`} />
```

### Cards / boxes (one after another)
```tsx
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";

<StaggerGroup className="grid grid-cols-3 gap-6">
  <StaggerItem className="rounded-xl border p-6">Card 1</StaggerItem>
  <StaggerItem className="rounded-xl border p-6">Card 2</StaggerItem>
  <StaggerItem className="rounded-xl border p-6">Card 3</StaggerItem>
</StaggerGroup>
```

### Button hover animation
```tsx
import AnimatedButton from "@/components/AnimatedButton";

<AnimatedButton onClick={() => console.log("clicked")}>
  Get Started
</AnimatedButton>

// or as a link
<AnimatedButton href="/contact">Contact Us</AnimatedButton>
```

## 5. Tuning the feel
Open `lib/animations.ts` and adjust the `TIMING` object:
- `letterStagger` — speed between letters in headings
- `wordStagger` — speed between words in paragraphs
- `cardStagger` — delay between each card/box
- `moveDistance` — how far things move while animating (px)
- `blurAmount` — how blurry things start (px)
- `viewportAmount` — how much of the element must be visible before it
  starts animating (0.25 = 25%)

All animations play **once**, the first time each element scrolls into
view — they won't replay if the user scrolls back up. If you want them
to replay every time, change `once: true` to `once: false` in each
component's `viewport` prop.
