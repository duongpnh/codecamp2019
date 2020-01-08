import React from 'react';
import { renderRoutes } from 'react-router-config';
import routes from '../../constants/routes';

const Content = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 m-auto">
                {renderRoutes(routes)}
                </div>
            </div>
        </div>
    );
}


export default Content;
