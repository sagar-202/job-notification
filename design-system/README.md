# KodNest Premium Build System - Design System

A calm, intentional, and coherent design system for serious B2C products.

## Design Philosophy

**Calm, Intentional, Coherent, Confident**

This design system embodies professional restraint. No flashy effects, no loud colors, no animation noise. Every element serves a clear purpose.

## Core Principles

### Color System (Maximum 4 colors)
- **Background**: `#F7F6F3` (off-white)
- **Primary Text**: `#111111` (near black)
- **Accent**: `#8B0000` (deep red)
- **Success**: `#2D5016` (muted green)
- **Warning**: `#8B6914` (muted amber)

### Typography
- **Headings**: Crimson Pro (serif), large, confident, generous spacing
- **Body**: Inter (sans-serif), 16px, line-height 1.7, max-width 720px
- **No decorative fonts, no random sizes**

### Spacing System (Consistent scale)
- `8px` - Extra small
- `16px` - Small
- `24px` - Medium
- `40px` - Large
- `64px` - Extra large

**Never use random spacing like 13px, 27px, etc.**

### Transitions
- Duration: `150ms`
- Easing: `ease-in-out`
- No bounce, no parallax

## Global Layout Structure

Every page follows this structure:

```
[Top Bar]
    ↓
[Context Header]
    ↓
[Primary Workspace (70%) + Secondary Panel (30%)]
    ↓
[Proof Footer]
```

### Top Bar
- **Left**: Project name
- **Center**: Progress indicator (Step X / Y)
- **Right**: Status badge (Not Started / In Progress / Shipped)

### Context Header
- Large serif headline
- One-line subtext
- Clear purpose, no hype language

### Primary Workspace (70% width)
- Main product interaction area
- Clean cards, predictable components
- No crowding

### Secondary Panel (30% width)
- Step explanation (short)
- Copyable prompt box
- Action buttons
- Calm styling

### Proof Footer (Persistent bottom section)
Checklist style with user proof inputs:
- ☐ UI Built
- ☐ Logic Working
- ☐ Test Passed
- ☐ Deployed

## Component Rules

### Buttons
- **Primary**: Solid deep red background
- **Secondary**: Outlined with border
- Same hover effect and border radius everywhere
- Consistent transitions

### Form Inputs
- Clean borders
- No heavy shadows
- Clear focus state
- Predictable behavior

### Cards
- Subtle border (`1px solid #D4D2CC`)
- No drop shadows
- Balanced padding (`40px`)
- Consistent border radius (`4px`)

### Status Badges
- Small, outlined style
- Color-coded by status
- Consistent sizing

## Error & Empty States

### Errors
- Explain what went wrong
- Provide how to fix
- Never blame the user
- Use calm, helpful language

### Empty States
- Provide next action
- Never feel dead
- Clear call-to-action

## Implementation

### Using the Design System

1. **Include the CSS file**:
```html
<link rel="stylesheet" href="styles.css">
```

2. **Include required fonts**:
```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

3. **Use CSS custom properties**:
```css
/* Access design tokens */
color: var(--color-accent);
padding: var(--space-md);
font-family: var(--font-serif);
```

### File Structure
```
design-system/
├── index.html          # Design system reference page
├── styles.css          # Complete design system CSS
└── README.md           # This file
```

## Visual Consistency

Everything must feel like one mind designed it. No visual drift.

- Same border radius everywhere: `4px`
- Same transition timing: `150ms ease-in-out`
- Same spacing scale: 8, 16, 24, 40, 64px
- Same color palette across all components
- Same typography hierarchy

## What This System Does NOT Include

- ❌ Gradients
- ❌ Glassmorphism
- ❌ Neon colors
- ❌ Animation noise
- ❌ Drop shadows
- ❌ Decorative fonts
- ❌ Random spacing values
- ❌ Playful or hackathon-style elements

## Design System Status

✅ **Complete and Ready for Implementation**

This design system is production-ready. All components follow the established principles and can be used immediately to build consistent, professional interfaces.
