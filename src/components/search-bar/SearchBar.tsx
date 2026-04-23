import styles from './SearchBar.module.scss';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    ariaLabel?: string;
}

export const SearchBar = ({
                              value,
                              onChange,
                              onSubmit,
                              placeholder = 'Search books...',
                              ariaLabel = 'Search books',
                          }: SearchBarProps) => {

    return (
        <div className={styles.wrapper}>
            <form
                className={styles.inputGroup}
                role="search"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >

                <input
                    className={styles.input}
                    type="text"
                    aria-label={ariaLabel}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    className={styles.button}
                    type="submit"
                    onClick={onSubmit}
                    aria-label="Search books"
                >
                    Search
                </button>
            </form>
        </div>
    );
};
