import "./styles.css";
import { useState } from "react";

function Modal({ open, setOpen, addNew }) {
  const [formstate, setFormstate] = useState({
    page: "",
    description: "",
    status: "live"
  });

  const handleChange = (e) => {
    setFormstate({
      ...formstate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew(formstate);
    setOpen(false);
    setFormstate({ page: "", description: "", status: "live" });
  };

  return (
    <>
      {open && (
        <div
          className="modalContainer"
          onClick={(e) => {
            if (e.target.className !== "modalContainer") return;
            setOpen(!open);
          }}
        >
          <div className="modal">
            <form>
              <div className="form-group">
                <label htmlFor="page"> Page </label>
                <input
                  type="text"
                  name="page"
                  value={formstate.page}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description"> Description </label>
                <textarea
                  // type="text"
                  name="description"
                  value={formstate.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status"> Status </label>
                <select
                  name="status"
                  value={formstate.status}
                  onChange={handleChange}
                >
                  <option value="Live">Live</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button className="btn" onClick={handleSubmit}>
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Table({ data, handleDelete }) {
  return (
    <div className="tablewrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Page:</th>
            <th className="expand">Description:</th>
            <th>Status: </th>
            <th>Actions: </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((n, i) => {
              return (
                <tr key={i}>
                  <td>{n.page}</td>
                  <td>{n.description}</td>
                  <td>{n.status}</td>
                  <span className="rowz">
                    <button
                      className="btnDelete"
                      onClick={() => {
                        handleDelete(i);
                      }}
                    >
                      Delete
                    </button>
                    {/* <button>Edit</button> */}
                  </span>
                </tr>
              );
            })}
          {/* <tr>
            <td>page 1</td>
            <td>asdfasfdasdfasdfasf</td>
            <td>Live</td>
            <span>
              <button>Delete</button>
              <button>Edit</button>
            </span>
          </tr>
          <tr>
            <td>page 2</td>
            <td>asdfasfdasdfasdfasf</td>
            <td>Live</td>
            <span>
              <button>Delete</button>
              <button>Edit</button>
            </span>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
export default function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([
    { page: "page 1", description: "asdfasdfasdf descrip 1", status: "live" },
    { page: "page 2", description: "asdfasdfasdf descrip 1", status: "live" },
    {
      page: "page 3",
      description: "sdf descrip 2",
      status: "live"
    }
  ]);

  function addNew(newdata) {
    setData([...data, newdata]);
  }

  function handleDelete(i) {
    const newdata = data.filter((n, id) => {
      return id !== i;
    });
    setData(newdata);
  }

  return (
    <div className="App">
      <Table data={data} handleDelete={handleDelete} />
      <button
        className="addnewbtn"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new
      </button>
      <Modal open={open} setOpen={setOpen} addNew={addNew} />
    </div>
  );
}
