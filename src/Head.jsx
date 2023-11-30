export default function Head() {
  return (
    <main className="w-100 h-32 bg-sky-600 flex flex-row justify-around align-middle">
      <a href="/" className="font-extralight text-slate-50 py-4 md:text-8xl max-md:text-5xl">
        Task Manager
      </a>
      <div className="btn_container h-fit flex justify-around align-middle self-center">
        <a className="p-5 hover:bg-sky-500 text-slate-50" href="/task-list">
          Task List
        </a>
        <a className="p-5 hover:bg-sky-500 text-slate-50" href="/add-task">
          Add Task
        </a>
      </div>
    </main>
  );
}
