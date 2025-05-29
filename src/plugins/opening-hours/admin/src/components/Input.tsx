import * as React from 'react';
import { Field } from '@strapi/design-system';

export const Input = React.forwardRef((props: any, ref: any) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value, error } = props;

  const [schedule, setSchedule] = React.useState(
    value || {
      monday: { enabled: false, open: '', close: '' },
      tuesday: { enabled: false, open: '', close: '' },
      wednesday: { enabled: false, open: '', close: '' },
      thursday: { enabled: false, open: '', close: '' },
      friday: { enabled: false, open: '', close: '' },
      saturday: { enabled: false, open: '', close: '' },
      sunday: { enabled: false, open: '', close: '' },
    }
  );

  const handleDayChange = (day: string, field: string, fieldValue: any) => {
    const updated = {
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: fieldValue,
      },
    };

    setSchedule(updated);
    onChange({
      target: { name, type: attribute.type, value: updated, touched: true },
    });
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const cellStyle = {
    padding: '12px',
    border: '1px solid #ccc',
  };

  const checkBoxStyle = {
    transform: 'scale(1.5)',
    cursor: 'pointer',
  };

  const timeInputStyle = {
    width: '120px',
    padding: '6px',
    fontSize: '14px',
  };

  return (
    <>
      <Field.Root error={error}>
        <Field.Label>{name}</Field.Label>
        <table border={1}>
          <thead>
            <tr>
              <th style={cellStyle}>Day</th>
              <th style={cellStyle}>Open</th>
              <th style={cellStyle}>Open Time</th>
              <th style={cellStyle}>Close Time</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td style={cellStyle}>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                <td style={cellStyle}>
                  <input
                    type="checkbox"
                    checked={schedule[day].enabled}
                    onChange={(e) => handleDayChange(day, 'enabled', e.target.checked)}
                    style={checkBoxStyle}
                  />
                </td>
                <td style={cellStyle}>
                  <input
                    type="time"
                    value={schedule[day].open}
                    onChange={(e) => handleDayChange(day, 'open', e.target.value)}
                    disabled={!schedule[day].enabled}
                    style={timeInputStyle}
                  />
                </td>
                <td style={cellStyle}>
                  <input
                    type="time"
                    value={schedule[day].close}
                    onChange={(e) => handleDayChange(day, 'close', e.target.value)}
                    disabled={!schedule[day].enabled}
                    style={timeInputStyle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Field.Error />
      </Field.Root>
    </>
  );
});
