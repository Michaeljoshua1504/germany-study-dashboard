import { useState } from 'react';

// Edit / Delete with an inline two-step delete (no confirm() popups).
export default function RowActions({ onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="row-actions">
        <span className="row-actions-ask">Delete?</span>
        <button type="button" className="is-danger" onClick={onDelete}>Yes</button>
        <button type="button" onClick={() => setConfirming(false)}>No</button>
      </span>
    );
  }
  return (
    <span className="row-actions">
      <button type="button" onClick={onEdit}>Edit</button>
      <button type="button" onClick={() => setConfirming(true)}>Delete</button>
    </span>
  );
}
