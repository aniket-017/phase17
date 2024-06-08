import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterType as setReduxFilterType } from "../Services/Actions/filterAction.js";
import { getScrews } from "../Services/Actions/screwAction.js";
import { getBolts } from "../Services/Actions/boltAction.js";
import { getPlates } from "../Services/Actions/plateAction.js";
import "./filters.css";

const Filters = () => {
  const dispatch = useDispatch();
  const filterTypeRedux = useSelector(state => state.filterType);
  const [localFilterType, setLocalFilterTypeState] = useState("screws"); // Rename the state setter
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (filterName, option) => {
    const updatedOptions = { ...selectedOptions, [filterName]: option };
    setSelectedOptions(updatedOptions);
  
  const selectedFilters = Object.entries(updatedOptions)
      .map(([filter, selectedOption]) => `${filter}: ${selectedOption}`)
      .join(', ');
  
    console.log(`[${selectedFilters}]`);
    let keyword= "";
    let currentPage = 1;
   
    dispatch(getScrews(keyword, currentPage, updatedOptions));
    dispatch(getBolts(keyword, currentPage, updatedOptions));
    dispatch(getPlates(keyword, currentPage, updatedOptions));
   
  };
  
  const setLocalFilterType = (type) => { // Rename the function
    setLocalFilterTypeState(type); // Update local state
    setSelectedOptions({});
    dispatch(setReduxFilterType(type)); // Dispatch action to update Redux state
    dispatch(getScrews());
    dispatch(getBolts());
    dispatch(getPlates());
  };

  let filterOptions = [];
  switch (localFilterType) {
    case "screws":
      filterOptions = [
        { name: 'Gen Trade Name / Technical Name & Type', backendName: 'screwType', options: ['Wood screw', 'Machine screw', 'Self-tapping screw'] },
        { name: 'Specified Standard', backendName: 'standard', options: ['ANSI', 'DIN', 'ISO', 'ASTM'] },
        { name: 'Certification / Approval', backendName: 'certification', options: ['RoHS compliant', 'CE marked', 'ISO 9001 certified'] },
        { name: 'Surface Finish', backendName: 'surfaceFinish', options: ['Zinc-plated', 'Black oxide', 'Galvanized', 'Stainless steel'] },
        { name: 'Brand / Make', backendName: 'brand', options: ['Acme Screws Inc.', 'BoltMaster Ltd.', 'FastenAll'] },
        { name: 'Industry Standard Number / Trade Number', backendName: 'industryStandard', options: ['ASME B18.6.3', 'ISO 7049', 'DIN 7981'] },
        { name: 'Material of Construction (MOC)', backendName: 'material', options: ['Steel', 'Brass', 'Nylon'] },
        { name: 'Thread Size (Metric)', backendName: 'threadSize', options: ['M2', 'M3', 'M4'] },
        { name: 'Length (Metric)', backendName: 'length', options: ['25mm', '40mm', '50mm'] },
        { name: 'Rating - Elec / Temp / Pres / Class', backendName: 'rating', options: ['Class 8', 'Temperature rating: -40°C to 120°C'] },
      ];
      break;
    case "bolts":
      filterOptions = [
        { name: 'Bolt Type', backendName: 'boltType', options: ['Hex bolt', 'Carriage bolt', 'Eye bolt', 'Flange bolt', 'U-bolt'] },
        { name: 'Specified Standard', backendName: 'standard', options: ['ANSI', 'DIN', 'ISO', 'ASTM'] },
        { name: 'Certification / Approval', backendName: 'certification', options: ['RoHS compliant', 'CE marked', 'ISO 9001 certified'] },
        { name: 'Surface Finish', backendName: 'surfaceFinish', options: ['Zinc-plated', 'Black oxide', 'Galvanized', 'Stainless steel'] },
        { name: 'Brand / Make', backendName: 'brand', options: ['BoltWorks Co.', 'Nut & Bolt Solutions', 'Titan Bolts', 'FastenAll'] },
        { name: 'Industry Standard Number / Trade Number', backendName: 'industryStandard', options: ['ASME B18.2.1', 'ISO 4014', 'DIN 931', 'ASTM A325'] },
        { name: 'Material of Construction (MOC)', backendName: 'material', options: ['Steel', 'Stainless steel', 'Alloy steel', 'Brass'] },
        { name: 'Thread Size', backendName: 'threadSize', options: ['M6', '1/4"', 'M10', '3/8"'] },
        { name: 'Length', backendName: 'length', options: ['20mm', '1 inch', '50mm', '2 inches'] },
        { name: 'Grade', backendName: 'grade', options: ['Grade 5', 'Grade 8', 'Grade A307', 'Grade 10.9'] },
      ];
      break;
    case "plates":
      filterOptions = [
        { name: 'Plate Type', backendName: 'plateType', options: ['Flat plate', 'Tread plate', 'Checker plate', 'Perforated plate', 'Diamond plate'] },
        { name: 'Material', backendName: 'material', options: ['Steel', 'Aluminum', 'Stainless steel', 'Brass', 'Copper'] },
        { name: 'Thickness', backendName: 'thickness', options: ['1mm', '2mm', '3mm', '1/8 inch', '1/4 inch'] },
        { name: 'Width', backendName: 'width', options: ['100mm', '200mm', '300mm', '4 inches', '6 inches'] },
        { name: 'Length', backendName: 'length', options: ['500mm', '1000mm', '1500mm', '20 inches', '36 inches'] },
        { name: 'Surface Finish', backendName: 'surfaceFinish', options: ['Mill finish', 'Polished', 'Brushed', 'Galvanized', 'Powder-coated'] },
        { name: 'Usage/Application', backendName: 'usage', options: ['Construction', 'Automotive', 'Industrial', 'Decorative', 'Marine'] },
        { name: 'Pattern', backendName: 'pattern', options: ['Raised', 'Embossed', 'Diamond', 'Checkered'] },
        { name: 'Grade', backendName: 'grade', options: ['Grade 304 (for stainless steel)', 'Grade 6061 (for aluminum)', 'Grade 1018 (for steel)'] },
        { name: 'Certification', backendName: 'certification', options: ['ISO 9001 certified', 'RoHS compliant', 'ASTM certified'] },
      ];
      break;
    default:
      break;
  }

  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter-types">
        <span className={localFilterType === "screws" ? "active" : ""} onClick={() => setLocalFilterType("screws")}>
          Screws
        </span>
        <span className={localFilterType === "bolts" ? "active" : ""} onClick={() => setLocalFilterType("bolts")}>
          Bolts
        </span>
        <span className={localFilterType === "plates" ? "active" : ""} onClick={() => setLocalFilterType("plates")}>
          Plates
        </span>
      </div>
      {filterOptions.map((filter, index) => (
        <div key={index}>
          <h3 className="filterNameh3">{filter.name}</h3>
          <ul>
            {filter.options.map((option, idx) => (
              <li
                key={idx}
                className={selectedOptions[filter.backendName] === option ? "selected" : ""}
                onClick={() => handleOptionSelect(filter.backendName, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Filters;
