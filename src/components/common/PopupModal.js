import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const PopupModal = ({ isOpen, toggle, title, option, handler, equipments, data=null}) => {
  //const { data: equipments } = useGetAllEquipmentsQuery();
  //console.log(equipments);



  const fuelTypesEnv = process.env.REACT_APP_FUEL_TYPES;
  const vehicleStatusEnv = process.env.REACT_APP_VEHICLE_STATUS;

  const [equipmentData, setEquipmentData] = useState({
    id: 0,
    name: "",
  });

  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    driver: "",
    status: "",
    fuelType: "",
    equipments: [],
  });


  useEffect(() => {
    //console.log(data)
    if (option === "EDITV" && data) {
      setVehicleData({
        id: data.vehicle.id,
        name: data.vehicle.name,
        driver: data.vehicle.driver,
        status: data.vehicle.status,
        fuelType: data.vehicle.fuelType,
        equipments: data.vehicle.equipments,
      });
    }
  }, [option, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObject = option === "ADDE" ? equipmentData : vehicleData;
    handler(dataObject);
    setVehicleData((prevData) => ({
      ...prevData,
      name: "",
      driver: "",
      equipments: [],
    }));
    toggle();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (option === "ADDE") {
      setEquipmentData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (option === "ADDV") {
      setVehicleData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }else if (option === "EDITV") {
      setVehicleData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const equipmentId = parseInt(event.target.id);
    //console.log(equipmentId);

    if (event.target.checked) {
      setVehicleData((prevData) => ({
        ...prevData,
        equipments: prevData.equipments ? [...prevData.equipments, equipmentId] : [equipmentId],
      }));
      //console.log('checked',vehicleData.equipments);
    } else {
      setVehicleData((prevData) => ({
        ...prevData,
        equipments: prevData.equipments.filter(
          (equipment) => equipment !== equipmentId
        ),
      }));

      //console.log('unchecked',vehicleData.equipments);
    }
  };

  useEffect(() => {
    if (option === "ADDV") {
      handleChange({ target: { id: "fuelType", value: "Petrol" } });
      handleChange({ target: { id: "status", value: "active" } });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="md" className="app-modal">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {option === "ADDE" ? (
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-4 col-form-label">
                Equipment Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-4 col-form-label">
                Vehicle Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                  value={vehicleData.name}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-4 col-form-label">
                Driver
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="driver"
                  onChange={handleChange}
                  value={vehicleData.driver}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-4 col-form-label">
                Fuel Type
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="fuelType"
                  onChange={handleChange}
                  value={vehicleData.fuelType}
                >
                  {fuelTypesEnv.split(",").map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-4 col-form-label">
                Status
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="status"
                  onChange={handleChange}
                  value={vehicleData.status} 
                >
                  {vehicleStatusEnv.split(",").map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h6>Equipments</h6>
            <div className="row mb-3">
              {equipments
                ? equipments.map((equipment, index) => (
                    <div className="col-auto" key={index}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={equipment.id}
                          checked={vehicleData.equipments?.includes(
                            equipment.id
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridCheck1"
                        >
                          {equipment.name}
                        </label>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
};

export default PopupModal;
