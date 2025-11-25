import Chip from '../common/Chip';

const ChipList = ({
  techStacks,
  onDelete,
}: {
  techStacks: string[];
  onDelete: (index: number) => void;
}) => {
  return (
    <>
      {techStacks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStacks.map((tech, index) => (
            <Chip
              key={tech}
              label={tech}
              deletable={true}
              onDelete={() => onDelete(index)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ChipList;
