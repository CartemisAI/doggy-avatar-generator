// Generated from the runtime catalogs by scripts/build.mjs.
export type BreedId = "labrador" | "golden" | "german-shepherd" | "husky" | "shiba" | "corgi" | "beagle" | "basset" | "dachshund" | "greyhound" | "great-dane" | "boxer" | "french-bulldog" | "bulldog" | "pug" | "chihuahua" | "bull-terrier" | "schnauzer" | "poodle" | "bichon" | "shih-tzu" | "afghan" | "komondor" | "chinese-crested" | "dalmatian" | "border-collie" | "australian-shepherd" | "samoyed" | "pomeranian" | "akita" | "malamute" | "chow-chow" | "shar-pei" | "rottweiler" | "doberman" | "bernese" | "saint-bernard" | "newfoundland" | "great-pyrenees" | "tibetan-mastiff" | "mastiff" | "cane-corso" | "boston-terrier" | "staffordshire" | "whippet" | "italian-greyhound" | "saluki" | "borzoi" | "irish-wolfhound" | "bloodhound" | "basenji" | "rhodesian-ridgeback" | "weimaraner" | "vizsla" | "german-shorthaired-pointer" | "english-setter" | "irish-setter" | "cocker-spaniel" | "springer-spaniel" | "cavalier" | "papillon" | "pekingese" | "maltese" | "havanese" | "lhasa-apso" | "yorkshire-terrier" | "westie" | "scottish-terrier" | "airedale" | "jack-russell" | "border-terrier" | "cairn-terrier" | "bedlington" | "soft-coated-wheaten" | "shetland-sheepdog" | "rough-collie" | "belgian-malinois" | "australian-cattle-dog" | "old-english-sheepdog" | "portuguese-water-dog" | "japanese-spitz" | "keeshond" | "american-eskimo" | "finnish-spitz" | "norwegian-elkhound" | "swedish-vallhund" | "icelandic-sheepdog" | "cardigan-corgi" | "schipperke" | "belgian-tervuren" | "belgian-groenendael" | "beauceron" | "briard" | "bouvier" | "puli" | "pumi" | "mudi" | "lagotto" | "barbet" | "otterhound" | "chesapeake" | "flat-coated" | "curly-coated" | "toller" | "brittany" | "clumber" | "sussex-spaniel" | "welsh-springer" | "gordon-setter" | "english-pointer" | "ibizan-hound" | "pharaoh-hound" | "azawakh" | "sloughi" | "xolo" | "peruvian-hairless" | "thai-ridgeback" | "korean-jindo" | "shikoku" | "kai-ken";
export type Framing = 'auto' | 'bust' | 'full' | 'head';
export type ResolvedFraming = Exclude<Framing, 'auto'>;
export type Expression = "neutral" | "smile" | "tongue" | "wink" | "joy" | "curious" | "sleepy" | "surprised" | "grumpy" | "shy" | "laugh" | "smirk" | "kiss" | "worried" | "determined" | "dreamy" | "side-eye" | "blep" | "yawn" | "cheeky";
export type Headwear = "none" | "bow" | "cap" | "beanie" | "flower" | "crown" | "beret" | "chef-hat" | "witch-hat" | "cowboy" | "straw" | "sailor-cap" | "party-hat" | "top-hat" | "detective-hat" | "pilot" | "winter-earflap" | "flower-wreath" | "leaf" | "sprout" | "ribbon" | "tiara" | "space-cap" | "knight-helmet" | "sun-visor" | "mushroom-hat" | "cloud-hat" | "rainbow" | "dragon-horns" | "bee-antennae" | "strawberry-leaf" | "pumpkin" | "teacup" | "ramen-bowl" | "saturn" | "star-halo" | "lotus" | "feather" | "cactus" | "croissant";
export type Outfit = "bandana" | "tshirt" | "hoodie" | "raincoat" | "sweater" | "overalls" | "bowtie" | "sailor" | "chef" | "astronaut" | "detective" | "wizard" | "knight" | "gardener" | "denim" | "varsity" | "pajamas" | "kimono" | "hanfu" | "festival" | "tuxedo" | "puffer" | "fleece" | "rugby" | "pirate" | "scout" | "artist" | "poncho" | "flower-dress" | "dragon-robe" | "mushroom-cape" | "cloud-coat" | "stargazer" | "robot-suit" | "mermaid" | "royal-robe" | "steampunk" | "bee-suit" | "ladybug" | "strawberry" | "watermelon" | "ramen-apron" | "tea-apron" | "pizza-jacket" | "penguin" | "reindeer" | "polar-parka" | "jellyfish";
export type Accessory = "none" | "round-glasses" | "square-glasses" | "sunglasses" | "monocle" | "goggles" | "scarf" | "medal" | "flower-pin" | "necklace" | "lanyard" | "backpack" | "satchel" | "headphones" | "scout-badge" | "cape" | "fairy-wings" | "bow-collar" | "pearls" | "crystal" | "compass" | "camera" | "pocket-watch" | "rocket-pin" | "bouquet" | "bubble-brooch" | "heart-glasses" | "star-glasses" | "flower-glasses" | "sleep-mask";
export type Pose = "upright" | "tilt-left" | "tilt-right" | "lean-left" | "lean-right" | "chin-up" | "chin-down" | "peek-left" | "peek-right" | "proud" | "cozy" | "stretch";
export type Ears = "natural" | "alert" | "relaxed" | "left-perked" | "right-perked";
export type Coat = "chestnut" | "steel-tan" | "mahogany" | "liver" | "taupe" | "biscuit" | "charcoal" | "copper" | "lavender" | "peach" | "mint" | "sky" | "black" | "chocolate" | "yellow" | "gold" | "red" | "fawn" | "cream" | "white" | "silver" | "blue" | "tri" | "sable" | "skin" | "apricot";
export type Pattern = "breed" | "solid" | "blaze" | "patch" | "eye-patch" | "mask" | "points" | "spots" | "merle" | "brindle" | "ticking" | "roan" | "husky" | "urajiro" | "bernese";
export type GarmentColor = "lagoon" | "coral" | "honey" | "denim" | "lilac" | "forest" | "rose" | "ink" | "ivory" | "snow" | "ruby" | "emerald" | "sapphire" | "amethyst" | "tangerine" | "lemon" | "mint" | "peach" | "sky" | "cocoa" | "mocha" | "wine" | "olive" | "silver" | "gold" | "midnight" | "candy" | "aurora" | "sunset" | "neon";
export type HeadwearColor = "lagoon" | "coral" | "honey" | "denim" | "lilac" | "forest" | "rose" | "ink" | "ivory" | "snow" | "ruby" | "emerald" | "sapphire" | "amethyst" | "tangerine" | "lemon" | "mint" | "peach" | "sky" | "cocoa" | "mocha" | "wine" | "olive" | "silver" | "gold" | "midnight" | "candy" | "aurora" | "sunset" | "neon";
export type AccessoryColor = "lagoon" | "coral" | "honey" | "denim" | "lilac" | "forest" | "rose" | "ink" | "ivory" | "snow" | "ruby" | "emerald" | "sapphire" | "amethyst" | "tangerine" | "lemon" | "mint" | "peach" | "sky" | "cocoa" | "mocha" | "wine" | "olive" | "silver" | "gold" | "midnight" | "candy" | "aurora" | "sunset" | "neon";
export type Fabric = "plain" | "stripes" | "polka" | "checks" | "argyle" | "stars" | "hearts" | "flowers" | "scales" | "waves" | "confetti" | "clouds";
export interface AvatarOptions {
  breed?: BreedId;
  /** Logical display size. Exactly 24 and 32 default to bust framing. */
  size?: number;
  framing?: Framing;
  /** Transparent by default; accepts CSS hex colors or 'transparent'. */
  background?: string;
  /** Namespace for clip IDs when embedding multiple inline SVGs. */
  prefix?: string;
  expression?: Expression;
  headwear?: Headwear;
  outfit?: Outfit;
  accessory?: Accessory;
  pose?: Pose;
  ears?: Ears;
  coat?: Coat;
  pattern?: Pattern;
  garmentColor?: GarmentColor;
  headwearColor?: HeadwearColor;
  accessoryColor?: AccessoryColor;
  fabric?: Fabric;
}
export type CollectionAvatarOptions = Omit<AvatarOptions, 'breed'>;
export interface BreedInfo { readonly id: BreedId; readonly name: string; readonly nameZh: string; readonly group: string; readonly description: string; }
export type CollectionStyle = Required<Pick<AvatarOptions, "expression" | "headwear" | "outfit" | "accessory" | "pose" | "ears" | "garmentColor" | "headwearColor" | "accessoryColor" | "fabric">>;
export interface CollectionEntry {
  id: string; index: number; version: string; breed: BreedId; seed: string;
  individual: number; look: number; coat: Coat; pattern: string; style: CollectionStyle;
}
export declare const VERSION: string;
export declare const COLLECTION_COUNT: number;
export declare const BREED_CATALOG: readonly BreedInfo[];
export declare const STYLE_OPTIONS: Readonly<{
  expression: readonly Expression[];
  headwear: readonly Headwear[];
  outfit: readonly Outfit[];
  accessory: readonly Accessory[];
  pose: readonly Pose[];
  ears: readonly Ears[];
  coat: readonly Coat[];
  pattern: readonly Pattern[];
  garmentColor: readonly GarmentColor[];
  headwearColor: readonly HeadwearColor[];
  accessoryColor: readonly AccessoryColor[];
  fabric: readonly Fabric[];
}>;
export declare function createAvatar(seed: string | number, options?: AvatarOptions): string;
export declare function createCollectionAvatar(index: number, options?: CollectionAvatarOptions): string;
export declare function getCollectionEntry(index: number): CollectionEntry;
export declare function resolveFraming(size?: number, framing?: Framing): ResolvedFraming;
export declare function toDataUri(svg: string): string;
