import React from 'react';
import { HRIconSmall } from '../imagepath';
import { useNavigate } from 'react-router-dom';

const ViewHrProfile = ({ profile }) => {
  const hrViewPrifileStyle = {
    display: 'flex',
    color: '#0F62AB',
    fontWeight: 500,
    fontSize: 12,
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 0,
    backgroundColor: 'transparent',
  };

  const navigate = useNavigate();

  const doNavigation = () => {
    navigate('/hr-module', {
      state: {
        user_id: profile?.id ? profile.id : '',
        profile: profile,
      },
    });
  };

  return (
    <button
      style={hrViewPrifileStyle}
      onClick={() => {
        doNavigation();
      }}
    >
      <img src={HRIconSmall} alt="icon" />
      <span style={{ marginLeft: 5 }}>{'View HR profile'}</span>
    </button>
  );
};

export default ViewHrProfile;
