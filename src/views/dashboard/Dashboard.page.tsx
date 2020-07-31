import React from 'react';
import { useDispatch } from 'react-redux';
import { loadUsers } from 'store/effects';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ApplicationState } from 'store/types';
import { AutocompleteAsync, Page } from 'components';
import { useTranslation } from 'react-i18next';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state: ApplicationState) => state.users);
  const i18n = useSelector((state: ApplicationState) => state.i18n);
  const { t } = useTranslation();

  const fetchUsers = () => {
    dispatch(loadUsers());
  };

  return (
    <Page title="Dashboard">
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div>
            {t('shared.french')}
            <br />
            Users List {i18n.locale}
            {usersState.loading.users && <b>Chargement....</b>}
            <ul>
              {usersState.users.map((user) => (
                <li key={user.name}>
                  {user.name} - {user.age} ans
                </li>
              ))}
            </ul>
            <AutocompleteAsync />
            <Button variant="contained" color="primary" onClick={fetchUsers}>
              fetch Users
            </Button>
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default Dashboard;
