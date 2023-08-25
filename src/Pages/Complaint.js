import React from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function Complaint() {
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        {/* content */}
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-6 col-xl-12">
                <div class="card">
                  <div class="card-header">Pooja Moukhede {1477}</div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                    </blockquote>
                  </div>
                </div>

                <div class="card mt-4">
                  <div class="card-header">Complaint Number 101</div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <footer class="blockquote-footer">
                      Dhruva Solanki {" "}
                        <cite title="Source Title">{1541}</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                <div class="card mt-4">
                  <div class="card-header">Complaint Number 104</div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer posuere erat a ante.
                      </p>
                      <footer class="blockquote-footer">
                      Swati Chauhan {" "}
                        <cite title="Source Title">{1059}</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
