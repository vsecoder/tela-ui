import type { FC, ReactNode } from 'react';
import { cn } from '../cn';

export interface InfoScreenFeature {
  icon: ReactNode;
  title: string;
  description?: string;
}

export interface InfoScreenProps {
  title: string;
  features?: InfoScreenFeature[];
  /** Action area — typically a <Button /> */
  action?: ReactNode;
  className?: string;
}

export const InfoScreen: FC<InfoScreenProps> = ({ title, features, action, className }) => (
  <div className={cn('ui-info-screen', className)}>
    <div className="ui-info-screen__body">
      <h1 className="ui-info-screen__title">{title}</h1>
      {features && features.length > 0 && (
        <ul className="ui-info-screen__features">
          {features.map((f, i) => (
            <li key={i} className="ui-info-screen__feature">
              <span className="ui-info-screen__feature-icon">{f.icon}</span>
              <span className="ui-info-screen__feature-text">
                <span className="ui-info-screen__feature-title">{f.title}</span>
                {f.description && (
                  <span className="ui-info-screen__feature-desc">{f.description}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
    {action && <div className="ui-info-screen__action">{action}</div>}
  </div>
);
