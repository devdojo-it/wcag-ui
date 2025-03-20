# Foundations – Colors

Colors are more than just visual accents; they form the very soul of your user interface. In wcagUI, every hue is chosen with purpose, to both delight the eye and ensure accessibility. The color palette is designed to evoke specific emotions and responses, while also meeting rigorous accessibility standards.

---

## A Thoughtful Palette for Every Mood

Our color system is divided into neutral tones and vibrant hues, each serving a unique role:

- **Neutral Tones:**  
  The neutral colors provide a calm and balanced background, ensuring that the primary content remains the focus. They create a solid foundation that works consistently in both light and dark modes. For example:

  ```css
  /* Neutral - same in light and dark modes */
  --wcag-c--neutral-00: hsl(248, 28%, 96%);
  --wcag-c--neutral-20: hsl(248, 28%, 92%);
  --wcag-c--neutral-50: hsl(248, 28%, 90%);
  --wcag-c--neutral-100: hsl(248, 28%, 84%);
  --wcag-c--neutral-200: hsl(248, 28%, 78%);
  --wcag-c--neutral-300: hsl(248, 28%, 70%);
  --wcag-c--neutral-400: hsl(248, 28%, 58%);
  --wcag-c--neutral-500: hsl(248, 28%, 48%);
  --wcag-c--neutral-600: hsl(248, 70%, 30%);
  --wcag-c--neutral-700: hsl(248, 70%, 22%);
  --wcag-c--neutral-800: hsl(248, 70%, 14%);
  --wcag-c--neutral-900: hsl(248, 70%, 8%);
  ```

  These neutrals serve as a versatile canvas, allowing the more expressive colors to shine without overwhelming the user.

- **Expressive Hues:**  
  The vibrant colors add life, meaning, and direction to your design. Each hue is carefully calibrated for both aesthetics and functionality:

  - **Blue:**  
    Evoking trust and serenity, the blue shades range from soft, light tones to deep, compelling hues. They are ideal for elements like buttons and links that invite interaction.

    ```css
    /* Blue */
    --wcag-c--blue-100: light-dark(hsl(245, 94%, 98%), hsl(245, 73%, 98%));
    --wcag-c--blue-200: light-dark(hsl(245, 94%, 94%), hsl(245, 73%, 94%));
    --wcag-c--blue-300: light-dark(hsl(245, 94%, 84%), hsl(245, 73%, 84%));
    --wcag-c--blue-400: light-dark(hsl(245, 94%, 74%), hsl(245, 73%, 74%));
    --wcag-c--blue-500: light-dark(hsl(245, 94%, 67%), hsl(245, 73%, 67%));
    --wcag-c--blue-600: light-dark(hsl(245, 94%, 48%), hsl(245, 73%, 48%));
    --wcag-c--blue-700: light-dark(hsl(245, 94%, 38 ()), hsl(245, 73%, 38%));
    --wcag-c--blue-800: light-dark(hsl(245, 94%, 28 ()), hsl(245, 73%, 28%));
    ```

  - **Green:**  
    Representing harmony and growth, the green spectrum is perfect for success messages and interactive states. It grounds your design in nature and balance.

    ```css
    /* Green */
    --wcag-c--green-100: light-dark(hsl(122, 40%, 90%), hsl(122, 30%, 90%));
    --wcag-c--green-200: light-dark(hsl(122, 40%, 75 ()), hsl(122, 30%, 75%));
    --wcag-c--green-300: light-dark(hsl(122, 40%, 49 ()), hsl(122, 30%, 49%));
    --wcag-c--green-400: light-dark(hsl(122, 40%, 38 ()), hsl(122, 30%, 38%));
    --wcag-c--green-500: light-dark(hsl(122, 40%, 20 ()), hsl(122, 30%, 20%));
    ```

  - **Yellow:**  
    Yellow radiates energy and optimism. It is perfect for drawing attention to key areas without overwhelming the senses, adding a spark of creativity.

    ```css
    /* Yellow */
    --wcag-c--yellow-100: light-dark(hsl(37, 40%, 90 ()), hsl(37, 80%, 90%));
    --wcag-c--yellow-200: light-dark(hsl(37, 40%, 75 ()), hsl(37, 80%, 75%));
    --wcag-c--yellow-300: light-dark(hsl(37, 40%, 49 ()), hsl(37, 80%, 49%));
    --wcag-c--yellow-400: light-dark(hsl(37, 40%, 38 ()), hsl(37, 80%, 38%));
    --wcag-c--yellow-500: light-dark(hsl(37, 40%, 20 ()), hsl(37, 80%, 20%));
    ```

  - **Red:**  
    Red is dynamic and intense, capturing attention and conveying urgency or error states effectively. Use it sparingly to ensure it remains impactful.

    ```css
    /* Red */
    --wcag-c--red-100: light-dark(hsl(0, 40%, 90 ()), hsl(0, 60%, 90%));
    --wcag-c--red-200: light-dark(hsl(0, 40%, 75 ()), hsl(0, 60%, 75%));
    --wcag-c--red-300: light-dark(hsl(0, 40%, 49 ()), hsl(0, 60%, 49%));
    --wcag-c--red-400: light-dark(hsl(0, 40%, 38 ()), hsl(0, 60%, 38%));
    --wcag-c--red-500: light-dark(hsl(0, 40%, 20 ()), hsl(0, 60%, 20%));
    ```

---

## Accessible Contrast and Storytelling

Every color in this palette is not just a number—it's a story. The neutrals evoke a sense of calm, serving as the silent, supportive stage upon which the brighter colors can shine. Blue invites trust and professionalism, green nurtures growth and balance, yellow inspires creativity and optimism, and red signals importance and urgency.

When designing your interfaces, think about how these colors interact with each other and with your content. The right contrast isn't merely about compliance—it's about creating a visual narrative that guides users through your digital experience. Use tools like the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to ensure that your chosen combinations provide clear readability for all users, especially those with visual impairments.

---

## Implementing Themes with Ease

One of the strengths of wcagUI is the ease with which you can switch between different themes. By updating these CSS custom properties, you can offer users a consistent and engaging experience regardless of their preference for light or dark mode.

For instance, you can define a dark theme to complement the default light palette:

```css
@layer dark-theme {
  :root {
    --wcag-c--neutral-00: hsl(248, 28%, 16%);
    --wcag-c--neutral-20: hsl(248, 28%, 22%);
    /* Adjust additional variables as needed for a dark environment */
  }
}
```

Toggle between themes using JavaScript by modifying the class on your `<html>` element, and let the magic of CSS custom properties do the rest.

---

## Practical Tips for a Cohesive Design

- **Consistency is Key:**  
  Use the defined variables consistently to maintain a harmonious look throughout your interface.

- **Visual Feedback:**  
  Leverage color changes for interactive states—like hover and focus—to provide clear visual feedback while ensuring accessibility.

- **Test Across Conditions:**  
  Regularly test your color combinations under various lighting conditions and devices to ensure they meet accessibility standards and convey the desired emotional tone.

---

Navigation:  
Previous: None  
Next: [Elevations →](./foundations-elevations.html)
