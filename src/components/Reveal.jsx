import useReveal from '../hooks/useReveal'

function Reveal({ children, className = '', as = 'div', delay = 0 }) {
  const [ref, visible] = useReveal()
  const Tag = as

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
