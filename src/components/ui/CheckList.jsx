import { Stagger, StaggerItem } from '../motion/Stagger';
import Icon from './Icon';

// List of ticked items with a title and a sub-line each.
export default function CheckList({ items }) {
  return (
    <Stagger className="check-list" gap={0.12}>
      {items.map((item) => (
        <StaggerItem key={item.title} className="check-item">
          <div className="check-icon">
            <Icon name="check" size={12} strokeWidth={2} />
          </div>
          <div>
            <div className="check-title">{item.title}</div>
            <div className="check-sub">{item.sub}</div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
