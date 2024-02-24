export default function LoginForm() {
  return (
    <form action="#" className="w-[95%] max-w-md mt-6 mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          name=""
          id="email"
          placeholder="email address"
          className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          name=""
          id="password"
          placeholder="********"
          className="h-12 w-full block border border-gray-900 rounded px-2 placeholder:text-xs bg-transparent text-xs focus:outline-none focus:placeholder:text-primary"
        />
      </div>
      <button className="h-12 bg-primary text-white block w-full rounded hover:bg-red-900">
        Login
      </button>
    </form>
  );
}
