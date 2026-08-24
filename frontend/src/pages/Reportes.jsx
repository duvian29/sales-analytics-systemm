import Layout from "../layouts/Layout";

function Reportes(){

    return (

        <Layout>

            <div className="container">

                <h2 className="mb-4">
                    Reportes
                </h2>

                <div className="card shadow">

                  <div className="card-body">

                      <h4>Dasboard Power Bi</h4>


                      <p>Desde esta sección se podran visualizar los indicadores y reportes generados en Power BI</p>


                      <button className="btn btn-primary">
                          Abrir Dashboard
                      </button>

                  </div>

                </div>

            </div>
        </Layout>
    )
}

export default Reportes;