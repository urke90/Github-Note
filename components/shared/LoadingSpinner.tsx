interface ILoadingSpinnerProps {
  asLayout?: boolean;
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  asLayout = false,
}) => {
  return (
    <div
      className={`my-5 flex items-center justify-center ${asLayout ? 'fixed left-0 top-0 min-h-screen w-full bg-black-900 opacity-80' : ''}`}
    >
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
