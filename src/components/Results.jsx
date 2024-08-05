import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
    const { name } = useContext(UserContext);

    return (
        <div>
            <p>
                <strong>{name}</strong>, your character is: {element}
            </p>
            {artwork ? (
                <div className="artwork">
                    <h2>{artwork.name}</h2>
                    <img src={artwork.imageUrl} alt={artwork.name} />
                    <p>{artwork.films[0]}</p>
                </div>
            ) : (
                <p>No artwork found.</p>
            )}
        </div>
    );
}