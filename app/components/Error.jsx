export default function Error({ title, children }) {
  return (
    <div className="w-50 m-auto text-center py-4 text-decoration-none">
      <img
        className="my-3"
        src="/images/exclamation-circle-fill.svg"
        alt="exclamation-circle-fill"
        style={{ width: '80px' }}
      />
      <h2>{title}</h2>
      {children}
    </div>
  );
}
