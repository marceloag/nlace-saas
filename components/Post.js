function Post({ children, ...props }) {
  return (
    <div
      className="w-full bg-slate-300 text-gray-900 rounded-md px-4 py-2 w-full mb-2"
      {...props}
    >
      <textarea className="w-full min-w-96">{props.text}</textarea>

      <small>{props.fecha_publicacion}</small>
    </div>
  );
}

export default Post;
