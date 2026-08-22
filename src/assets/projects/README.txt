Drop project screenshots here using these exact filenames:

  tayo-supermarket.png
  somarena.png
  car-rental.png
  pomodoro.png

The Projects component (src/components/Projects.jsx) automatically
picks up any matching file via import.meta.glob — no code changes
needed. Until a file is added, that project card falls back to the
designed placeholder cover art.

Supported formats: .png, .jpg, .jpeg, .webp
