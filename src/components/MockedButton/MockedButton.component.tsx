import React from 'react';
import clsx from 'clsx';
import SecureLS from 'secure-ls';
import styles from './MockedButton.module.scss';
const ls = new SecureLS({ encodingType: 'aes' });

export default function MockedButton() {
  const [mocked, setMocked] = React.useState(ls.get('mocked') || false);
  React.useEffect(() => {
    ls.set('mocked', mocked);
    (window as any).mocked = mocked;
  }, [mocked]);
  return (
    <div
      onClick={() => setMocked(!mocked)}
      className={clsx(styles.button, !mocked && styles.button_unmock)}>
      {mocked ? 'un mocked' : 'mocked'}
    </div>
  );
}
