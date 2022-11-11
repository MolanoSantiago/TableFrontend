import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerProcedimientosExactos,
  obtenerProcedimientosSimilares,
} from "../../redux/procedimientosDuck";
import DataTable from "../DataTable/DataTable";
import { exactos, similares } from "../Utils/DataTableColumns";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function TabsPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  const datosSimilares = useSelector(
    (store) => store.procedimientos.arraySimilares
  );

  const datosExactos = useSelector(
    (store) => store.procedimientos.arrayExactos
  );

  const loading = useSelector(
    (store) => store.procedimientos.loading
  );

  useEffect(() => {
    dispatch(obtenerProcedimientosSimilares());
    dispatch(obtenerProcedimientosExactos());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography ml={1.5} mt={1} variant="h2" color="#000">
        Procedimientos Almacenados Duplicados
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "#000" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Similares" {...a11yProps(0)} />
          <Tab label="Exactos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography ml={1.5} mt={1} variant="p" color="#000">
          Tabla que muestra SP's que están duplicados similarmente por nombre y cuenta el numero de veces que se encuentra duplicado por esquema.
        </Typography>
        <DataTable rows={datosSimilares} columns={similares} loading={loading}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography ml={1.5} mt={1} variant="p" color="#000">
          Tabla que muestra SP's que están duplicados exactamente por nombre y muestra el consecutivo del duplicado.
        </Typography>
        <DataTable rows={datosExactos} columns={exactos} loading={loading}/>
      </TabPanel>
      <Box align="center" mb={1}></Box>
    </Box>
  );
}
