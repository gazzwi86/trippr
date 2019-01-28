import React, { PureComponent } from "react";
import classnames from "classnames";
import Nav from "../Nav";
import Header from "../Header";
import Footer from "../Footer";
import "./styles.css";

class Wrapper extends PureComponent {
  state = {
    showMenu: false
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  render() {
    const { children } = this.props;
    const { showMenu } = this.state;

    return (
      <div className="wrapper">
        <div
          className={classnames("wrapper__page", {
            "wrapper__page--menu-active": showMenu
          })}
        >
          <Nav showMenu={showMenu} />

          <Header showMenu={showMenu} toggleMenuAction={this.toggleMenu} />

          <main className="wrapper__main">{children}</main>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Wrapper;
