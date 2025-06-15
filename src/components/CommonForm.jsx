import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import ImageUploadGrid from '../pages/Upload';

const CommonForm = ({
  fields,
  schema,
  onSubmit,
  defaultValues = {},
  fieldVisibility = () => true,
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit',
  onCancel,
  isLoading,
}) => {
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  useEffect(() => {
    ஃ;
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const renderFieldItem = (field, parentKey = '') => {
    const fieldName = parentKey ? `${parentKey}.${field.id}` : field.id;
    const error = errors?.[fieldName];
    const watchedFields = watch(fieldName);
    if (!fieldVisibility(field, watch)) return null;
    if (field.type === 'radio') {
      return (
        <div key={fieldName} className="mb-6 col-span-3">
          <Label htmlFor={fieldName}>{field.label}</Label>
          <div className="flex gap-4 mt-2">
            {field.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${fieldName}_${option}`}
                  value={option}
                  {...register(fieldName)}
                  name={fieldName}
                  className="h-4 w-4"
                />
                <Label htmlFor={`${fieldName}_${option}`}>{option}</Label>
              </div>
            ))}
          </div>
          <div className="min-h-[20px]">
            {' '}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </div>
        </div>
      );
    }

    return (
      <div key={fieldName} className="">
        <Label htmlFor={fieldName} className={'my-3'}>
          {field.label}
        </Label>
        {field.type === 'select' ? (
          <Select
            defaultValue={watch(fieldName)}
            onValueChange={(value) => {
              setValue(fieldName, value, { shouldValidate: true });
              trigger(fieldName);
            }}
          >
            <SelectTrigger className="h-14 w-full py-[26px] border border-gray-300 rounded-lg px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'file' ? (
          <div key={fieldName} className="flex flex-col">
            <ImageUploadGrid
              value={watchedFields}
              onChange={(newImages) => {
                console.log('Setting value for', fieldName, newImages);
                setValue(fieldName, newImages, { shouldValidate: true });
              }}
              name={fieldName}
            />
          </div>
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={fieldName}
              {...register(fieldName)}
              checked={watch(fieldName)}
              onChange={(e) => {
                setValue(fieldName, e.target.checked, { shouldValidate: true });
              }}
              className="h-4 w-4"
            />
            <Label htmlFor={fieldName}>Yes</Label>
          </div>
        ) : field.type === 'date' ? null : (
          // <DatePicker
          //     id={fieldName}
          //     value={watch(fieldName)}
          //     onChange={(date) => setValue(fieldName, date, { shouldValidate: true })}
          //     placeholder={field.placeholder}
          //     error={error?.message}
          //     disabled={sameAsFacility}
          // />
          <Input
            id={fieldName}
            type={field.type}
            placeholder={field.placeholder}
            {...register(fieldName)}
            className="h-14"
          />
        )}
        <div className="min-h-[20px]">
          {' '}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
        </div>
      </div>
    );
  };
  const renderFields = (fieldList, parentKey = '') => {
    const rows = [];
    let currentRow = [];

    fieldList.forEach((field, index) => {
      if (field.type === 'group') {
        if (currentRow.length) {
          rows.push(
            <div key={`row-${rows.length}`} className="grid grid-cols-3 gap-10">
              {currentRow}
            </div>,
          );
          currentRow = [];
        }

        rows.push(
          <div key={field.id} className="my-6">
            <Label className="text-[#0F31AF] text-lg font-medium">
              {field.label}
            </Label>
            <hr className="mb-5 mt-2" />
            {renderFields(
              field.fields,
              parentKey ? `${parentKey}.${field.id}` : field.id,
            )}

            {/* Handle SubGroups if present */}
            {field.subGroups &&
              field.subGroups.map((subGroup, subIndex) => (
                <div
                  key={`${field.id}-sub-${subIndex}`}
                  className="mt-4 pl-4 border-l-4 border-blue-300"
                >
                  <Label className="text-[#5856D6] text-md font-medium">
                    {subGroup.label}
                  </Label>
                  <hr className="mb-5 mt-2" />
                  {renderFields(
                    subGroup.fields,
                    parentKey
                      ? `${parentKey}.${field.id}.subGroups[${subIndex}]`
                      : `${field.id}.subGroups[${subIndex}]`,
                  )}
                </div>
              ))}
          </div>,
        );
        return;
      }

      const fieldComponent = renderFieldItem(field, parentKey);
      if (!fieldComponent) return;

      // If file field, flush the current row and render separately
      if (field.type === 'file') {
        if (currentRow.length) {
          rows.push(
            <div key={`row-${rows.length}`} className="grid grid-cols-3 gap-10">
              {currentRow}
            </div>,
          );
          currentRow = [];
        }
        rows.push(
          <div key={field.id} className="mb-6">
            {fieldComponent}
          </div>,
        );
      } else {
        currentRow.push(fieldComponent);

        if (currentRow.length === 3 || index === fieldList.length - 1) {
          rows.push(
            <div key={`row-${rows.length}`} className="grid grid-cols-3 gap-10">
              {currentRow}
            </div>,
          );
          currentRow = [];
        }
      }
    });

    return rows;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">{renderFields(fields)}</div>
      <div className="my-5">
        <div className="flex justify-end gap-3 px-3">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              className="w-28"
              onClick={onCancel}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            type="submit"
            variant="info"
            className="w-28"
            isLoading={isLoading}
          >
            {submitButtonText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommonForm;
