# Foundations – Elevations

Elevations add a sense of depth and hierarchy to your user interface. They simulate physical space through subtle shadow effects, guiding the user's focus and distinguishing interactive elements from the background. In wcagUI, elevations are defined using CSS box-shadow properties and design tokens, ensuring that the visual depth is both consistent and accessible.

---

## Elevation Levels

**Small Elevation**  
Used for a slight lift, the small elevation creates minimal depth. It’s perfect for elements that need a gentle separation from the background.

```html
<section el="sm">box-shadow: 0px 2px 40px -2px hsla(248, 28%, 55%, 0.08)</section>
```

**Medium Elevation**  
This level offers a more pronounced shadow, ideal for elements that require more emphasis, such as buttons or cards that invite interaction.

```html
<section el="md">box-shadow: 0px 8px 40px -2px hsla(248, 28%, 55%, 0.1)</section>
```

**Large Elevation**  
Large elevation creates a deep shadow effect, commonly used for modals or dialogs. It clearly separates the element from the rest of the interface, drawing immediate attention.

```html
<section el="lg">box-shadow: 0px 18px 60px 2px hsla(248, 28%, 55%, 0.1)</section>
```

---

## Design Considerations

Elevations are more than just visual effects—they communicate the structure and importance of elements within your design. The careful use of shadow intensity and spread creates a visual narrative, helping users intuitively understand which elements are interactive or primary. Always test your elevations under various conditions to ensure that they enhance usability without compromising accessibility.

---

Navigation:  
Previous: [Colors →](./foundations-colors.html)  
Next: [Spacings →](./foundations-spacings.html)
