const Navbar = () => (
  <div className="border-b-2 border-slate-300">
    <div className="container mx-auto">
      <div className="flex items-center justify-between p-4">
        <div>devjoca</div>
        <div className="flex space-x-2">
          <div>
            <a href="https://github.com/devjoca" target="_blank">
              Github
            </a>
          </div>
          <div>
            <a href="https://twitter.com/devjoca" target="_blank">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { Navbar };
