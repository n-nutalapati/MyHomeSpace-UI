import "./MenuItem.css";

const MenuItem = ({ item, deleteMenu, editRow }) => {
  return (
    <div className="menu-item">
      <li key={item.id}>
        <span>
          {item.name}
        </span>
        <div>
          <button className="btn update" onClick={() => editRow(item.id)}>edit</button>
          <button className="btn delete" onClick={() => deleteMenu(item.id)}>delete</button>
        </div>
      </li>
    </div>
  );
};

export default MenuItem;
