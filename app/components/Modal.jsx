import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#ffffff',
    border: '1px solid #eee',
    boxShadow: 24,
    p: 2
};

export default function ModalLayout({ children, onClose, open, title }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <div className="modal-wrap">
                        <div className="d-flex flex-direction-column justify-content-between">
                            <h4>{title}</h4>
                            <div onClick={onClose} style={{ cursor: 'pointer' }}>
                                <img src="images/x-lg.svg" alt="x-lg" />
                            </div>
                        </div>
                        {children}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}