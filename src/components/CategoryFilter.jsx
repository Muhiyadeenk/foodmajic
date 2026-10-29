export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <nav className="categories" aria-label="Food categories">
      {categories.map((c) => (
        <button
          key={c}
          className={`chip ${active === c ? 'chip-active' : ''}`}
          onClick={() => onChange(c)}
          aria-pressed={active === c}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}
