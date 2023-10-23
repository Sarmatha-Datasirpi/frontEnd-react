import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { rebootDevice } from '../../store/actions';

const RebootModal = ({ rebootingDevice, onClose }) => {
    const dispatch = useDispatch();
    const handleReboot = useCallback(() => {
        dispatch(
            rebootDevice({
                configsave: "false",
                deviceId: rebootingDevice
            })
        );
        onClose();
    }, [dispatch, onClose, rebootingDevice]);

    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reboot Device</h5>
                        <span aria-hidden="true" style={{ fontSize: "25px", cursor: "pointer" }} onClick={onClose}>&times;</span>
                    </div>
                    <div className="modal-body">
                        <div className="confirmation-content">
                            <h3 className="confirmation-question">Are you sure you want to reboot this Sonic device?  </h3>
                            <p className="confirmation-note">
                                <span className="warning-text">
                                    <h6 className='text-warning'><b>Warning: This action will restart the device</b></h6>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" class="btn btn-success" onClick={handleReboot}>
                            Reboot
                        </button>
                        <button type="button" class="btn btn-light" data-dismiss="modal" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RebootModal;
