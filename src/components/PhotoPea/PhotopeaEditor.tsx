'use client';

type Props = {
    photopeaUrl: string;
};

export default function PhotopeaEditor({ photopeaUrl }: Props) {
    return <iframe src={photopeaUrl} className="w-screen h-screen"></iframe>;
}
