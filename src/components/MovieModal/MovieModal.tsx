import { createPortal } from "react-dom"
import type { Movie } from "../../types/movie"
import css from "./MovieModal.module.css"
import { useEffect } from "react"

export default function MovieModal ({selectedMovie, onClose}: {selectedMovie: Movie, onClose: () => void}) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
    <div className={css.modal} onClick={(e) => {e.stopPropagation()}}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
        &times;
        </button>
        <img
        src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
        alt={`${selectedMovie.title}`}
        className={css.image}
        />
        <div className={css.content}>
        <h2>{selectedMovie.title}</h2>
        <p>{selectedMovie.overview}</p>
        <p>
            <strong>Release Date:</strong> {selectedMovie.release_date}
        </p>
        <p>
            <strong>Rating:</strong> {selectedMovie.vote_average}/10
        </p>
        </div>
    </div>
    </div>, 
    document.getElementById("modal-root")!
    )
}