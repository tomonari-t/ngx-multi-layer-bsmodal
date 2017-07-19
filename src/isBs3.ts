export const isBs3: () => boolean = () => {
    return (window as any).__theme !== 'bs4';
};
