Form Component Integration Instructions
The Form component supports a configurable delay for visibility using the delay prop. By default, it appears after 5 seconds. Pass delay={0} for instant visibility.

Examples
Default Behavior (5-second delay)
jsx
Copy code
<Form /> {/* Form will appear after 5 seconds */}
Instant Visibility
jsx
Copy code
<Form delay={0} /> {/* Form will appear immediately */}