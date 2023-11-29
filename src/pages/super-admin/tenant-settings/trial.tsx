import React, { forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { TenantPortal } from '../../../components/context/context';
import { findLabelText } from '../../../components/commonMethod';
import { TenantLabelText } from '../../../components/tenantComponent/constants';
const Trial = () => {
  const {
    setIsTrial,
    setStartDate,
    setEndDate,
    isTrial,
    startDate,
    endDate,
    setSubscriptionRenew,
    isSubscriptionAutoRenew,
  } = useContext(TenantPortal);
  const DatePickerCustomInput = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <div className="end-date" onClick={onClick} ref={ref}>
        <span>
          {new Date(value).getDate() < 10
            ? `0${new Date(value).getDate()}`
            : new Date(value).getDate()}
        </span>
        <span>
          {new Date(value).getMonth() + 1 < 10
            ? `0${new Date(value).getMonth() + 1}`
            : new Date(value).getMonth() + 1}
        </span>
        <span>
          {new Date(value)
            .getFullYear()
            .toString()
            .split('')
            .splice(2, 2)
            .join('')}
        </span>
      </div>
    ),
  );
  return (
    <>
      <div className="form-group">
        <label className="settings-radio-label">
          {findLabelText(
            TenantLabelText.Trial,
            TenantLabelText.Trial,
            TenantLabelText.Common_Values,
          )}
        </label>
        <div className="settings-radio-btns">
          {}
          <label className="super_admin_custom_radio">
            <input
              type="radio"
              onChange={() => {
                setIsTrial(!isTrial);
                setStartDate(new Date());
                const date = new Date();
                date.setDate(date.getDate() + 14);
                const formattedDate = new Date(date);
                setEndDate(formattedDate);
              }}
              checked={isTrial ? true : false}
            />
            <span className="super_admin_checkmark" />
            {findLabelText(
              TenantLabelText.Yes,
              TenantLabelText.Yes,
              TenantLabelText.Common_Values,
            )}
          </label>
          <label className="super_admin_custom_radio">
            <input
              type="radio"
              onChange={() => {
                setIsTrial(!isTrial);
                setStartDate(new Date());
                const date = new Date();
                date.setDate(date.getDate() + 30);
                const formattedDate = new Date(date);
                setEndDate(formattedDate);
              }}
              checked={isTrial ? false : true}
            />
            <span className="super_admin_checkmark" />
            {findLabelText(
              TenantLabelText.No,
              TenantLabelText.No,
              TenantLabelText.Common_Values,
            )}
          </label>
        </div>
      </div>
      {isTrial ? (
        <>
          <div className="form-group">
            <label>
              {findLabelText(
                TenantLabelText.Trail_start_date,
                TenantLabelText.Trail_start_date,
                TenantLabelText.Common_Values,
              )}
            </label>
            <DatePicker
              selected={startDate}
              onChange={e => setStartDate(e)}
              startDate={startDate}
              minDate={new Date()}
              maxDate={new Date(endDate)}
              customInput={<DatePickerCustomInput />}
            />
          </div>
          <div className="form-group">
            <label>
              {findLabelText(
                TenantLabelText.Trail_end_date,
                TenantLabelText.Trail_end_date,
                TenantLabelText.Common_Values,
              )}
            </label>
            <DatePicker
              selected={endDate}
              onChange={e => setEndDate(e)}
              startDate={endDate}
              minDate={new Date(startDate)}
              customInput={<DatePickerCustomInput />}
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>
              {findLabelText(
                TenantLabelText.Subscription_start_date,
                TenantLabelText.Subscription_start_date,
                TenantLabelText.Common_Values,
              )}
            </label>
            <DatePicker
              selected={startDate}
              onChange={e => setStartDate(e)}
              startDate={startDate}
              minDate={new Date()}
              maxDate={new Date(endDate)}
              customInput={<DatePickerCustomInput />}
            />
          </div>
          <div className="form-group">
            <label>
              {findLabelText(
                TenantLabelText.Subscription_end_date,
                TenantLabelText.Subscription_end_date,
                TenantLabelText.Common_Values,
              )}
            </label>
            <DatePicker
              selected={endDate}
              onChange={e => setEndDate(e)}
              startDate={endDate}
              minDate={new Date(startDate)}
              customInput={<DatePickerCustomInput />}
            />
          </div>
          <div className="form-group">
            <label className="settings-radio-label">
              {findLabelText(
                TenantLabelText.Subscription_auto_renew,
                TenantLabelText.Subscription_auto_renew,
                TenantLabelText.Common_Values,
              )}
            </label>
            <div className="settings-radio-btns">
              <label className="super_admin_custom_radio">
                <input
                  type="radio"
                  onChange={() => {
                    setSubscriptionRenew(!isSubscriptionAutoRenew);
                  }}
                  checked={isSubscriptionAutoRenew ? true : false}
                />
                <span className="super_admin_checkmark" />
                {findLabelText(
                  TenantLabelText.Yes,
                  TenantLabelText.Yes,
                  TenantLabelText.Common_Values,
                )}
              </label>
              <label className="super_admin_custom_radio">
                <input
                  type="radio"
                  onChange={() => {
                    setSubscriptionRenew(!isSubscriptionAutoRenew);
                  }}
                  checked={isSubscriptionAutoRenew ? false : true}
                />
                <span className="super_admin_checkmark" />
                {findLabelText(
                  TenantLabelText.No,
                  TenantLabelText.No,
                  TenantLabelText.Common_Values,
                )}
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Trial;
