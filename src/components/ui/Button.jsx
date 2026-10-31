import { Link } from 'react-router-dom';
import Magnetic from '../motion/Magnetic';
import Icon from './Icon';

// Pill button that drifts toward the mouse. `variant` is 'primary' (white → gradient) or 'ghost' (glass).
export default function Button({ to, href, variant = 'primary', icon = true, children, ...rest }) {
  const className = variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  const content = (
    <>
      {children}
      {icon && (
        <span className="btn-icon">
          <Icon name="arrowRight" size={13} strokeWidth={2.2} />
        </span>
      )}
    </>
  );

  return (
    <Magnetic strength={0.25}>
      {to ? (
        <Link className={className} to={to} {...rest}>
          {content}
        </Link>
      ) : href ? (
        <a className={className} href={href} {...rest}>
          {content}
        </a>
      ) : (
        <button className={className} {...rest}>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
