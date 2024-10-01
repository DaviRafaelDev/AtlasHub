import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from '@mui/material';

function GlobalSettings({ open, onClose, darkMode, setDarkMode, isPaginated, setIsPaginated }) {

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedPaginated = localStorage.getItem('isPaginated') === 'true';
    
    setDarkMode(savedDarkMode);
    setIsPaginated(savedPaginated);
  }, [setDarkMode, setIsPaginated]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('isPaginated', isPaginated);
  }, [darkMode, isPaginated]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Global Settings</DialogTitle>
      <DialogContent>
        <div className="mb-3">
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
            label="Dark Mode"
          />
        </div>
        <div>
          <FormControlLabel
            control={<Switch checked={isPaginated} onChange={(e) => setIsPaginated(e.target.checked)} />}
            label="Paginated View"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GlobalSettings;