const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-[51rem] px-[7.5rem] py-10 text-red-500">
      {children}
    </div>
  );
};

export default PageContainer;
