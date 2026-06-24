import './SessionCards.css';

export default function SessionCards({ sessions, onSessionClick }) {
  return (
    <div className="session-cards">
      {sessions.map((session) => (
        <button
          key={session.id}
          className="session-card"
          onClick={() => onSessionClick(session.id)}
          aria-label={`Открыть: ${session.name}`}
        >
          <div className="session-card__image-wrap">
            {session.cover ? (
              <img
                src={session.cover}
                alt={session.name}
                className="session-card__image"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="session-card__placeholder" />
            )}
            <div className="session-card__overlay">
              <span className="session-card__name">{session.name}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
