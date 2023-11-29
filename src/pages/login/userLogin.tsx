import React from 'react';
import PasswordLogin from './passwordLogin';
import { Link } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
export default function UserLogin() {
  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="login-set">
            <div className="loginbox">
              <div className="text-center login-logo">
                <Link to="#">
                  <img src={HDPlusLogo} alt="logo" height={102} width={109} />
                </Link>
              </div>
              <PasswordLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
