import enum


class WindsEnum(enum.Enum):
    NORTH = "N"
    WEST = "W"
    SOUTH = "S"
    EAST = "E"
    NORTH_EAST = "NE"
    NORTH_WEST = "NW"
    SOUTH_EAST = "SE"
    SOUTH_WEST = "SW"

    @classmethod
    def to_tuples(cls):
        return [(x.value, x.name) for x in cls]
