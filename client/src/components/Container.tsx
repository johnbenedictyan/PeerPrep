interface IContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}

export default Container;