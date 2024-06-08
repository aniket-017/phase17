import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadCSV } from "./Services/Actions/brewActions";
import { uploadScrewCSV } from "./Services/Actions/sActions";
import { uploadPlateCSV } from "./Services/Actions/pActions";
import { getScrews, addScrew, updateScrew } from "./Services/Actions/screwAction";
import { getPlates, addPlate, updatePlate } from "./Services/Actions/plateAction";
import { getBolts, addBolt, updateBolt, deleteBolt } from "./Services/Actions/boltAction";
import "./AdminLogin.css";

const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState(null);

  const [screwsState, setScrewsState] = useState({ loading: false, error: null, success: null });
  const [platesState, setPlatesState] = useState({ loading: false, error: null, success: null });
  const [boltsState, setBoltsState] = useState({ loading: false, error: null, success: null });

  const dispatch = useDispatch();
  const brewUpload = useSelector((state) => state.brew);
  const { loading, error, success } = brewUpload;

  const { screws } = useSelector((state) => state.screws);
  const { plates } = useSelector((state) => state.plates);
  const { bolts } = useSelector((state) => state.bolts);

  let a = screws.screws;
  let b = "Screws";
  if (selectedItemType === "screws") {
    b = "Screws";
    a = screws.screws;
  } else if (selectedItemType === "plates") {
    b = "Plates";
    a = plates.plates;
  } else if (selectedItemType === "bolts") {
    b = "Bolts";
    a = bolts.bolts;
  }

  useEffect(() => {
    dispatch(getScrews());
    dispatch(getPlates());
    dispatch(getBolts());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (file) {
      if (type === "screws") {
        setScrewsState({ loading: true, error: null, success: null });
        dispatch(uploadScrewCSV(file))
          .then(() => {
            setScrewsState({ loading: false, error: null, success: "File uploaded successfully!" });
          })
          .catch((error) => {
            setScrewsState({ loading: false, error: "Error uploading file", success: null });
          });
      } else if (type === "plates") {
        setPlatesState({ loading: true, error: null, success: null });
        dispatch(uploadPlateCSV(file))
          .then(() => {
            setPlatesState({ loading: false, error: null, success: "File uploaded successfully!" });
          })
          .catch((error) => {
            setPlatesState({ loading: false, error: "Error uploading file", success: null });
          });
      } else if (type === "bolts") {
        setBoltsState({ loading: true, error: null, success: null });
        dispatch(uploadCSV(file))
          .then(() => {
            setBoltsState({ loading: false, error: null, success: "File uploaded successfully!" });
          })
          .catch((error) => {
            setBoltsState({ loading: false, error: "Error uploading file", success: null });
          });
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditMode(true);
  };

  const handleSelectItemType = (itemType) => {
    setSelectedItemType(itemType);
  };

  const handleDelete = (id) => {
    dispatch(deleteBolt(id)); // Dispatch action to delete bolt
  };

  const handleSave = () => {
    if (editMode) {
      // Update the selected item
      // dispatch(updateScrew(selectedItem)); or similar for plates and bolts
    } else {
      // Add new item
      // dispatch(addScrew(newItem)); or similar for plates and bolts
    }
    setEditMode(false);
    setSelectedItem(null);
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="dashboard">
        <div className="card" onClick={() => handleSelectItemType("screws")}>
          <h3>Total Screws</h3>
          <p>{screws.screws.length}</p>
        </div>
        <div className="card" onClick={() => handleSelectItemType("plates")}>
          <h3>Total Plates</h3>
          <p>{plates.plates.length}</p>
        </div>
        <div className="card" onClick={() => handleSelectItemType("bolts")}>
          <h3>Total Bolts</h3>
          <p>{bolts.bolts.length}</p>
        </div>
      </div>

      <div className="csvfilesupload">
        <form className="form" onSubmit={(e) => handleSubmit(e, "screws")}>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload CSV for screws:
            </label>
            <input type="file" id="file" className="form-input" onChange={handleFileChange} />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          {screwsState.loading && <p className="loading">Loading...</p>}
          {screwsState.error && <p className="error">Error: {screwsState.error}</p>}
          {screwsState.success && <p className="success">{screwsState.success}</p>}
        </form>

        <form className="form" onSubmit={(e) => handleSubmit(e, "plates")}>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload CSV for plates:
            </label>
            <input type="file" id="file" className="form-input" onChange={handleFileChange} />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          {platesState.loading && <p className="loading">Loading...</p>}
          {platesState.error && <p className="error">Error: {platesState.error}</p>}
          {platesState.success && <p className="success">{platesState.success}</p>}
        </form>

        <form className="form" onSubmit={(e) => handleSubmit(e, "bolts")}>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Upload CSV for bolts:
            </label>
            <input type="file" id="file" className="form-input" onChange={handleFileChange} />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          {boltsState.loading && <p className="loading">Loading...</p>}
          {boltsState.error && <p className="error">Error: {boltsState.error}</p>}
          {boltsState.success && <p className="success">{boltsState.success}</p>}
        </form>
      </div>

      <div className="item-list">
        <h2>{b}</h2>
        {a &&
          a.map((screw) => (
            <div key={screw._id} className="item">
              <p>
                {screw.partNo} - {screw.description}
              </p>
              <button onClick={() => handleEdit(screw)}>Edit</button>
              <button>Delete</button>
            </div>
          ))}
      </div>

      {selectedItem && (
        <div className="edit-form">
          <h2>{editMode ? "Edit Item" : "Add New Item"}</h2>
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={selectedItem.partNo}
              onChange={(e) => setSelectedItem({ ...selectedItem, partNo: e.target.value })}
            />
            <input
              type="text"
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
