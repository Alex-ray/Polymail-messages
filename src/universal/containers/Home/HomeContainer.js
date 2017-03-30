import React, {Component, PropTypes} from 'react';

class HomeContainer extends Component {
  render () {
    return (
      <section>
        <h1>Hello World</h1>

        <form action="/login" method="post">
          <div>
              <label>email:</label>
              <input type="text" name="email"/>
          </div>
          <div>
              <label>Password:</label>
              <input type="password" name="password"/>
          </div>
          <div>
              <input type="submit" value="Log In"/>
          </div>
      </form>
      </section>
    );
  }
}

export default HomeContainer;
